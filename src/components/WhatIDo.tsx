import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>TECHNICAL SALES & SOLUTION CONSULTING</h3>
              <h4>Description</h4>
              <p>
                Supporting customers from technical requirement analysis to solution positioning, RFQ support, product demos, PoCs, and successful solution adoption.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">RFQ Support</div>
                <div className="what-tags">Solution Consulting</div>
                <div className="what-tags">Customer Discovery</div>
                <div className="what-tags">Product Positioning</div>
                <div className="what-tags">Technical Presentations</div>
                <div className="what-tags">Product Demos</div>
                <div className="what-tags">PoC Development</div>
                <div className="what-tags">Customer Enablement</div>
                <div className="what-tags">Stakeholder Management</div>
                <div className="what-tags">Pre-Sales Support</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>EDGE AI & SOFTWARE</h3>
              <h4>Description</h4>
              <p>
                Developing and maintaining local AI agents, software applications, and automating processes using Python and C++.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">C / C++</div>
                <div className="what-tags">RAG</div>
                <div className="what-tags">LLM</div>
                <div className="what-tags">ChromaDB</div>
                <div className="what-tags">Ollama</div>
                <div className="what-tags">Flask</div>
                <div className="what-tags">OpenVINO</div>
                <div className="what-tags">Qt</div>
                <div className="what-tags">Git</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>EMBEDDED SYSTEMS</h3>
              <h4>Description</h4>
              <p>
                System integration, BIOS/Firmware coordination, and technical pre-sales for embedded computing and Edge AI projects.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Embedded Computing</div>
                <div className="what-tags">Industrial AI</div>
                <div className="what-tags">BIOS/Firmware</div>
                <div className="what-tags">System Integration</div>
                <div className="what-tags">Jetson / NVIDIA</div>
                <div className="what-tags">COM Express</div>
                <div className="what-tags">SMARC</div>
                <div className="what-tags">Pre-Sales</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
