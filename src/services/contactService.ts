interface ContactFormData {
  nombre: string;
  empresa: string;
  email: string;
  mensaje: string;
}

interface ContactResponse {
  success: boolean;
  message?: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

