// ============================================================
//  Vibhatti Game — Google Apps Script
//  รวม: บันทึกคะแนน + ล็อกอิน + แจ้งเตือน LINE OA
// ============================================================

// 🟢 LINE Messaging API — Channel Access Token
var LINE_ACCESS_TOKEN = "RJ6iL4+fswStwoyirBnZpSI9KnFnMoi0gE+TpY7P7X0XP968/3WTq8ZbVEuAahWgbDxuj+loar+AsQTxgKzsuX VPC2/RsT0e/CBUI+JcQTWwJxWmIoRUdD1PhTUvTJy+NkOESyXsrMVpGTdRP/COLwdB04t89/1O/w1cDnyilFU=";

// 🟢 LINE Group ID หรือ User ID ที่จะส่งข้อความแจ้งเตือนไปหา
// (ดูวิธีรับ Group ID ในคู่มือ walkthrough.md)
var LINE_TARGET_ID = "";

// 🟢 ชื่อ Sheet สำหรับแต่ละหน้าที่
var SCORE_SHEET_NAME   = "Sheet1";       // ชีตบันทึกคะแนน (ชีตเดิมที่ใช้อยู่)
var LOGIN_SHEET_NAME   = "LoginHistory"; // ชีตบันทึกประวัติล็อกอิน

// ============================================================
//  doPost — รับข้อมูลจากเกม (login / score) + LINE Webhook events
// ============================================================
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // ──────────────────────────────────────────────────
    // กรณี: LINE Webhook Events (มี field "events")
    // ──────────────────────────────────────────────────
    if (body.events && Array.isArray(body.events)) {
      body.events.forEach(function(event) {
        handleLineEvent(event);
      });
      return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ──────────────────────────────────────────────────
    // กรณี: เกมส่ง action = "login"
    // ──────────────────────────────────────────────────
    if (body.action === "login") {
      var username = body.username || "ไม่ทราบชื่อ";
      logLogin(username);

      // ส่งแจ้งเตือนไป LINE
      var now = Utilities.formatDate(new Date(), "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss");
      var msg = "🔑 เข้าสู่ระบบ\n"
              + "👤 ผู้เล่น: " + username + "\n"
              + "🕐 เวลา: " + now;
      sendLineNotification(msg);

      return ContentService.createTextOutput(JSON.stringify({ status: "ok", action: "login" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ──────────────────────────────────────────────────
    // กรณี: เกมส่ง action = "score" หรือส่งคะแนนแบบเดิม
    // ──────────────────────────────────────────────────
    var scoreUsername = body.username || "ไม่ทราบชื่อ";
    var score        = body.score    || 0;
    var time         = body.time     || 0;

    // บันทึกคะแนนลง Sheet
    logScore(scoreUsername, score, time);

    // ส่งแจ้งเตือนคะแนนไป LINE
    var scoreMsg = "🏆 ผลคะแนนเกม Vibhatti\n"
                 + "👤 ผู้เล่น: " + scoreUsername + "\n"
                 + "📊 คะแนน: " + score + "\n"
                 + "⏱️ เวลา: " + time + " วินาที";
    sendLineNotification(scoreMsg);

    return ContentService.createTextOutput(JSON.stringify({ status: "ok", action: "score" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("doPost Error: " + err);
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
//  doGet — ดึงข้อมูล (leaderboard / loginHistory)
// ============================================================
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "leaderboard";

    // ──────────────────────────────────────────────────
    // ดึงประวัติล็อกอินล่าสุด 10 รายการ
    // ──────────────────────────────────────────────────
    if (action === "loginHistory") {
      var history = getLoginHistory();
      return ContentService.createTextOutput(JSON.stringify(history))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ──────────────────────────────────────────────────
    // ดึง Leaderboard (ค่าเริ่มต้น — ใช้โค้ดเดิม)
    // ──────────────────────────────────────────────────
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SCORE_SHEET_NAME);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data   = sheet.getDataRange().getValues();
    var result = [];

    for (var i = 1; i < data.length; i++) {  // ข้ามหัวตาราง
      result.push({
        username: data[i][0],
        score:    data[i][1],
        time:     data[i][2]
      });
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("doGet Error: " + err);
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
//  บันทึกคะแนนลง Google Sheets
// ============================================================
function logScore(username, score, time) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SCORE_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SCORE_SHEET_NAME);
    sheet.appendRow(["username", "score", "time", "timestamp"]);
  }
  var now = Utilities.formatDate(new Date(), "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss");
  sheet.appendRow([username, score, time, now]);
}

// ============================================================
//  บันทึกล็อกอินลง Sheet "LoginHistory"
// ============================================================
function logLogin(username) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(LOGIN_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(LOGIN_SHEET_NAME);
    sheet.appendRow(["username", "timestamp"]);
  }
  var now = Utilities.formatDate(new Date(), "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss");
  sheet.appendRow([username, now]);
}

// ============================================================
//  ดึงประวัติล็อกอินล่าสุด 10 รายการ
// ============================================================
function getLoginHistory() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(LOGIN_SHEET_NAME);
  if (!sheet) return [];

  var data   = sheet.getDataRange().getValues();
  var result = [];

  // ข้ามหัวตาราง (row 0), วนจากล่างขึ้นบนเพื่อเอารายการล่าสุดก่อน
  for (var i = data.length - 1; i >= 1; i--) {
    result.push({
      username:  data[i][0],
      timestamp: data[i][1]
    });
    if (result.length >= 10) break;
  }

  return result;
}

// ============================================================
//  ส่งข้อความแจ้งเตือนไปยัง LINE (Push Message)
// ============================================================
function sendLineNotification(message) {
  if (!LINE_ACCESS_TOKEN || !LINE_TARGET_ID) {
    Logger.log("[LINE] ยังไม่ได้ตั้งค่า TOKEN หรือ TARGET_ID — ข้ามการส่ง");
    return;
  }

  var url = "https://api.line.me/v2/bot/message/push";
  var payload = {
    to: LINE_TARGET_ID,
    messages: [
      {
        type: "text",
        text: message
      }
    ]
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + LINE_ACCESS_TOKEN
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log("[LINE] ส่งสำเร็จ: " + response.getContentText());
  } catch (err) {
    Logger.log("[LINE] ส่งล้มเหลว: " + err);
  }
}

// ============================================================
//  จัดการ LINE Webhook Events
//  - จับ Group ID อัตโนมัติเมื่อ Bot ถูก invite เข้ากลุ่ม
//  - ตอบกลับข้อความเบื้องต้น
// ============================================================
function handleLineEvent(event) {
  // จับ "join" event เพื่อบันทึก Group ID อัตโนมัติ
  if (event.type === "join" && event.source && event.source.groupId) {
    var groupId = event.source.groupId;
    Logger.log("🎉 Bot ถูก invite เข้ากลุ่ม! Group ID: " + groupId);

    // บันทึก Group ID ลง Script Properties เพื่อใช้ภายหลัง
    PropertiesService.getScriptProperties().setProperty("LINE_GROUP_ID", groupId);

    // อัปเดตตัวแปร LINE_TARGET_ID ให้ใช้งานได้ทันที
    LINE_TARGET_ID = groupId;

    // ส่งข้อความต้อนรับ
    replyMessage(event.replyToken, "🎮 สวัสดีครับ! บอทเกม Vibhatti พร้อมแจ้งเตือนแล้ว 🚀\n\nGroup ID: " + groupId);
    return;
  }

  // จับ "follow" event (user เพิ่มเพื่อนบอท)
  if (event.type === "follow" && event.source && event.source.userId) {
    var userId = event.source.userId;
    Logger.log("👤 User follow bot! User ID: " + userId);
    replyMessage(event.replyToken, "🎮 สวัสดีครับ! ขอบคุณที่เพิ่มเพื่อน\n\nUser ID ของคุณ: " + userId + "\n\nนำ ID นี้ไปใส่ในตัวแปร LINE_TARGET_ID เพื่อรับแจ้งเตือน");
    return;
  }

  // ตอบกลับข้อความทั่วไป
  if (event.type === "message" && event.message && event.message.type === "text") {
    var text = event.message.text.trim().toLowerCase();

    if (text === "/help" || text === "help") {
      replyMessage(event.replyToken,
        "📖 คำสั่งบอท Vibhatti:\n\n"
        + "/help — แสดงรายการคำสั่ง\n"
        + "/groupid — แสดง Group ID ปัจจุบัน\n"
        + "/userid — แสดง User ID ของคุณ"
      );
    } else if (text === "/groupid") {
      var gid = (event.source && event.source.groupId) ? event.source.groupId : "ไม่พบ (ต้องใช้ในกลุ่ม)";
      replyMessage(event.replyToken, "🆔 Group ID: " + gid);
    } else if (text === "/userid") {
      var uid = (event.source && event.source.userId) ? event.source.userId : "ไม่พบ";
      replyMessage(event.replyToken, "🆔 User ID: " + uid);
    }
  }
}

// ============================================================
//  ตอบกลับข้อความ LINE (Reply Message)
// ============================================================
function replyMessage(replyToken, message) {
  if (!LINE_ACCESS_TOKEN || !replyToken) return;

  var url = "https://api.line.me/v2/bot/message/reply";
  var payload = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: message
      }
    ]
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + LINE_ACCESS_TOKEN
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    Logger.log("[LINE Reply] Error: " + err);
  }
}

// ============================================================
//  ทดสอบส่งข้อความ LINE (รันได้จาก Script Editor เพื่อทดสอบ)
// ============================================================
function testSendLine() {
  sendLineNotification("🧪 ทดสอบส่งข้อความจาก Vibhatti Bot!\nถ้าเห็นข้อความนี้แสดงว่าเชื่อมต่อสำเร็จ ✅");
}
