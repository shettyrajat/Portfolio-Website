import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Application Engineer</h4>
                <h5>ADLINK Technology GmbH</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <div className="career-text">
              <p>I support customers, partners, and internal teams across EMEA by bridging technical requirements, product selection, solution consulting, and business opportunities.</p>
              <p>My work includes technical pre-sales, RFQ support, product demonstrations, proof-of-concepts, platform integration, customer escalations, BIOS/firmware coordination, and collaboration with Sales, Product Management, R&D, QA, and engineering teams.</p>
              <p className="career-key-focus"><strong>Key focus: </strong>Technical Pre-Sales · Solution Consulting · Embedded Computing · Edge AI · RFQ Support · Customer Enablement · Product Demos · PoCs · BIOS/Firmware Coordination</p>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>K-Tronik GmbH / Rohde & Schwarz</h5>
              </div>
              <h3>2021</h3>
            </div>
            <div className="career-text">
              <p>Developed and maintained C++ software applications in an Agile/Scrum engineering environment. Supported software testing, debugging, validation, Python-based automation, and cross-functional development workflows.</p>
              <p>Also handled Scrum processes including sprint planning, daily meetings, task tracking, and team coordination.</p>
              <p className="career-key-focus"><strong>Key focus: </strong>C++ Development · Python Automation · Software Testing · Agile/Scrum · Sprint Planning · Process Improvement · Cross-functional Collaboration</p>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internship & Master Thesis</h4>
                <h5>Fraunhofer IMM</h5>
              </div>
              <h3>2019</h3>
            </div>
            <div className="career-text">
              <p>Worked on the design of an electronic model for an SLS-based nanoparticle measurement system to improve measurement data output. Designed and simulated electronic circuits and PCB layouts, and programmed board-level components including ADC, DAC, digital potentiometer, and drivers.</p>
              <p className="career-key-focus"><strong>Key focus: </strong>Circuit Design · PCB Design · Embedded Programming · C/C++ · SPI/I2C · Measurement Systems · Hardware Integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
