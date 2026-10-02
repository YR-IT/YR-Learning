import emailjs from '@emailjs/browser';

/**
 * Service to dispatch emails using EmailJS from the browser.
 * Configuration is loaded from frontend/.env using Vite variables (VITE_EMAILJS_*)
 */

export const isEmailJsConfigured = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  return Boolean(serviceId && publicKey && serviceId.trim() && publicKey.trim());
};

/**
 * Send Contact Form inquiry email
 * @param {Object} params - { name, email, phone, subject, message }
 */
export const sendContactEmail = async (params) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  const templateId = (
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT ||
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  )?.trim();

  const templateParams = {
    from_name: params.name,
    from_email: params.email,
    phone_number: params.phone || 'Not provided',
    subject: params.subject || 'General Inquiry',
    message: params.message,
    sent_at: new Date().toLocaleString(),
    form_type: 'Contact Inquiry',
    // Fallback key names to accommodate various common EmailJS template fields:
    name: params.name,
    email: params.email,
    phone: params.phone || 'Not provided',
  };

  if (!serviceId || !publicKey || !templateId) {
    console.warn(
      '⚠️ [EmailJS] Contact email credentials missing in frontend/.env:\n' +
      `VITE_EMAILJS_SERVICE_ID: ${serviceId ? '✓' : 'MISSING'}\n` +
      `VITE_EMAILJS_PUBLIC_KEY: ${publicKey ? '✓' : 'MISSING'}\n` +
      `VITE_EMAILJS_TEMPLATE_ID_CONTACT: ${templateId ? '✓' : 'MISSING'}\n` +
      'EmailJS will send automatically once you populate these credentials.'
    );
    return { success: false, simulated: true, message: 'EmailJS credentials not set in .env' };
  }

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('✅ [EmailJS] Contact email sent successfully:', response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error('❌ [EmailJS] Failed to send contact email:', error);
    return { success: false, error };
  }
};

/**
 * Send Student Enrollment confirmation / notification email
 * @param {Object} params - Student enrollment payload
 */
export const sendEnrollmentEmail = async (params) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  const templateId = (
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ENROLL ||
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  )?.trim();

  const templateParams = {
    student_name: params.name,
    student_email: params.email,
    student_phone: params.phoneNumber,
    course_name: params.courseEnrolledFor,
    learning_mode: params.mode || 'Online',
    city: params.city || 'N/A',
    current_status: params.currentStatus || 'N/A',
    institution_or_company: params.institutionOrCompany || 'N/A',
    profession_or_course: params.currentProfessionOrCourse || 'N/A',
    expectations: params.expectations || 'N/A',
    coupon_code: params.couponCode || 'None',
    comments: params.comments || 'None',
    enrolled_at: new Date().toLocaleString(),
    form_type: 'Student Course Enrollment',
    // Fallback key names to accommodate various common EmailJS template fields:
    name: params.name,
    email: params.email,
    phone: params.phoneNumber,
    course: params.courseEnrolledFor,
    mode: params.mode,
  };

  if (!serviceId || !publicKey || !templateId) {
    console.warn(
      '⚠️ [EmailJS] Enrollment email credentials missing in frontend/.env:\n' +
      `VITE_EMAILJS_SERVICE_ID: ${serviceId ? '✓' : 'MISSING'}\n` +
      `VITE_EMAILJS_PUBLIC_KEY: ${publicKey ? '✓' : 'MISSING'}\n` +
      `VITE_EMAILJS_TEMPLATE_ID_ENROLL: ${templateId ? '✓' : 'MISSING'}\n` +
      'EmailJS will send automatically once you populate these credentials.'
    );
    return { success: false, simulated: true, message: 'EmailJS credentials not set in .env' };
  }

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('✅ [EmailJS] Enrollment email sent successfully:', response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error('❌ [EmailJS] Failed to send enrollment email:', error);
    return { success: false, error };
  }
};

const emailService = {
  isConfigured: isEmailJsConfigured,
  sendContactEmail,
  sendEnrollmentEmail,
};

export default emailService;
