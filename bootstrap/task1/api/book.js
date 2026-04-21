function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function normalizeSubmission(payload = {}) {
  return {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    mobileNumber: String(payload.mobileNumber || "").trim(),
    doctorName: String(payload.doctorName || "").trim(),
    appointmentDate: String(payload.appointmentDate || "").trim(),
    appointmentTime: String(payload.appointmentTime || "").trim(),
  };
}

export function GET() {
  return jsonResponse({
    success: true,
    message: "Appointment API is running.",
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const submission = normalizeSubmission(payload);

    const missingField = Object.entries(submission).find(([, value]) => !value);

    if (missingField) {
      return jsonResponse(
        { message: `Please fill in the ${missingField[0]} field.` },
        400
      );
    }

    console.log("Appointment request received:", submission);

    return jsonResponse({
      success: true,
      message: "Appointment request sent successfully.",
      submission,
    });
  } catch (error) {
    console.error("Appointment request failed:", error);

    return jsonResponse(
      { message: "Unable to process your appointment request right now." },
      500
    );
  }
}
