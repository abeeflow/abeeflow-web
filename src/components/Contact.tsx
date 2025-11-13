import './Contact.css';

const Contact = () => {
  return (
    <section id="contacto" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Agenda con nosotros</h2>
          <p>Analizamos tus procesos para identificar oportunidades.</p>
        </div>

        <div className="calendar-wrapper">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3J3r3K7-GmhVRDOp2PYGN66AQUKCkP0F-Y_fhgG3nKqhtyyg7vykG27zkLGe1gfE04zlBU3TAl?gv=true"
            title="Calendario de citas"
            frameBorder="0"
            allow="encrypted-media"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;

