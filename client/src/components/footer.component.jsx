import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-black w-full rounded text-white">
      <div className="bg-dark-grey flex justify-center gap-6 p-2 items-center">
        <Link to="/" className="hover:text-red duration-300">
          About us
        </Link>
        <Link to="/" className="hover:text-red duration-300">
          Contact us
        </Link>
        <Link to="/" className="hover:text-red duration-300">
          Feedback
        </Link>
        <Link to="/" className="hover:text-red duration-300">
          Visitor summary
        </Link>
        <Link to="/" className="hover:text-red duration-300">
          Help
        </Link>
        <Link to="/" className="hover:text-red duration-300">
          Link to us
        </Link>
        <Link to="/" className="hover:text-red duration-300">
          Newsletter
        </Link>
        <Link to="/" className="hover:text-red duration-300">
          Website ploicy
        </Link>
      </div>
      <div className=" p-4 flex justify-between gap-6">
        <ul className="w-1/2">
          <li className="first">
            <a href="/topics" role="link">
              <span className="text-2xl font-semibold">
                Information Related To
              </span>
            </a>
            <div className="flex justify-between w-1/2 gap-6">
              <div className="w-1/2 p-2">
                <ul className="flex gap-2 flex-col">
                  <li>
                    <a href="/topics/agriculture" role="link">
                      Agriculture
                    </a>
                  </li>
                  <li>
                    <a href="/topics/art-culture" role="link">
                      Art &amp; Culture
                    </a>
                  </li>
                  <li>
                    <a href="/topics/commerce" role="link">
                      Commerce
                    </a>
                  </li>
                  <li>
                    <a href="/topics/communications-it" role="link">
                      Communication
                    </a>
                  </li>
                  <li>
                    <a href="/topics/defence" role="link">
                      Defence
                    </a>
                  </li>
                  <li>
                    <a href="/topics/education" role="link">
                      Education
                    </a>
                  </li>
                  <li>
                    <a href="/topics/environment-forest" role="link">
                      Environment &amp; Forest
                    </a>
                  </li>
                  <li>
                    <a href="/topics/finance-taxes" role="link">
                      Finance &amp; Taxes
                    </a>
                  </li>
                  <li>
                    <a href="/topics/food-public-distribution" role="link">
                      Food &amp; Public Distribution
                    </a>
                  </li>
                  <li>
                    <a href="/topics/foreign-affairs" role="link">
                      Foreign Affairs
                    </a>
                  </li>
                  <li>
                    <a href="/topics/governance-administration" role="link">
                      Governance &amp; Administration
                    </a>
                  </li>
                  <li>
                    <a href="/topics/health-family-welfare" role="link">
                      Health &amp; Family Welfare
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 p-2">
                <ul className="flex gap-2 flex-col">
                  <li>
                    <a href="/topics/infrastructure" role="link">
                      Infrastructure
                    </a>
                  </li>
                  <li>
                    <a href="/topics/information-broadcasting" role="link">
                      Information &amp; Broadcasting
                    </a>
                  </li>
                  <li>
                    <a href="/topics/labour-employment" role="link">
                      Labour &amp; Employment
                    </a>
                  </li>
                  <li>
                    <a href="/topics/law-justice" role="link">
                      Law &amp; Justice
                    </a>
                  </li>
                  <li>
                    <a href="/topics/power-energy" role="link">
                      Power &amp; Energy
                    </a>
                  </li>
                  <li>
                    <a href="/topics/rural" role="link">
                      Rural
                    </a>
                  </li>
                  <li>
                    <a href="/topics/science-technology" role="link">
                      Science &amp; Technology
                    </a>
                  </li>
                  <li>
                    <a href="/topics/social-development" role="link">
                      Social Development
                    </a>
                  </li>
                  <li>
                    <a href="/topics/transport" role="link">
                      Transport
                    </a>
                  </li>
                  <li>
                    <a href="/topics/travel-tourism" role="link">
                      Travel &amp; Tourism
                    </a>
                  </li>
                  <li>
                    <a href="/topics/youth-sports" role="link">
                      Youth &amp; Sports
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          </ul>
          <ul className="w-1/2">
          <li>
            <a href="/my-government" role="link">
              <span className="text-2xl font-semibold">
                About the Government
              </span>
            </a>
            <ul className="p-2 flex gap-2 flex-col">
              <li>
                <a href="/my-government/constitution-india" role="link">
                  Constitution of India
                </a>
              </li>
              <li>
                <a href="/my-government/government-directory" role="link">
                  Government Directory
                </a>
              </li>
              <li>
                <a href="/my-government/indian-parliament" role="link">
                  Indian Parliament
                </a>
              </li>
              <li>
                <a href="/my-government/publications" role="link">
                  Publications
                </a>
              </li>
              <li>
                <a href="/my-government/whos-who" role="link">
                  Who's Who
                </a>
              </li>
              <li>
                <a href="/my-government/whos-who/president" role="link">
                  President of India
                </a>
              </li>
              <li>
                <a href="/my-government/whos-who/vice-president" role="link">
                  Vice-President of India
                </a>
              </li>
              <li>
                <a
                  href="/my-government/whos-who/chiefs-armed-forces"
                  role="link"
                >
                  Chiefs of Armed Forces
                </a>
              </li>
              <li>
                <a
                  href="/my-government/whos-who/members-parliament"
                  role="link"
                >
                  Members of Parliament
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
