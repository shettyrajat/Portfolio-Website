import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Projects & <span>Business Impact</span>
        </h2>
        <div className="work-flex">
          {[
            {
              name: "EMEA Embedded Solution Support",
              subtitle: "Technical Pre-Sales & Customer Solution Alignment",
              category: "Supported RFQ discussions, product selection, PoCs, demos, and technical solution alignment for embedded computing and Edge AI opportunities across EMEA.",
              tools: "RFQ Support · Solution Consulting · Product Demos · PoCs · Customer Enablement · COM Express · NVIDIA Jetson",
              image: "/images/emea-support.jpg"
            },
            {
              name: "Embedded Platform Integration",
              subtitle: "BIOS/Firmware Coordination & System Bring-up",
              category: "Supported integration, validation, bring-up, and troubleshooting of Intel, AMD, and NVIDIA-based embedded platforms, including BIOS/firmware coordination with engineering teams.",
              tools: "BIOS/Firmware · Embedded Linux · Intel/AMD Platforms · NVIDIA Jetson · System Integration · Troubleshooting",
              image: "/images/platform-integration.jpg"
            },
            {
              name: "Mira Agent",
              subtitle: "Offline Edge AI Document Intelligence",
              category: "Built a local AI document intelligence agent for technical knowledge retrieval from manuals, datasheets, and engineering documents using RAG, ChromaDB, Ollama, Flask, and Python.",
              tools: "Python · RAG · ChromaDB · Ollama · Flask · NVIDIA Jetson · Edge AI",
              image: "/images/mira-agent.png"
            },
            {
              name: "Nanoparticle Measurement System",
              subtitle: "Electronics Design & Embedded Measurement System",
              category: "Designed and simulated electronic circuits and PCB layouts for an SLS-based nanoparticle measurement system, including board-level component programming.",
              tools: "C/C++ · PCB Design · Circuit Simulation · ADC/DAC · Hardware Integration · Embedded Drivers",
              image: "/images/nanoparticle-system.jpg"
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p className="work-subtitle">{project.subtitle}</p>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
