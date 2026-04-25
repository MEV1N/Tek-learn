import './SharedPageStyles.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <header className="page-header">
        <div className="glow-white"></div>
        <div className="container">
          <h1 className="page-title">Get in <span className="text-accent">Touch</span></h1>
          <p className="page-subtitle">Have questions? We'd love to hear from you.</p>
        </div>
      </header>
      
      <section className="page-content container">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" className="form-control" placeholder="How can we help you?"></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
