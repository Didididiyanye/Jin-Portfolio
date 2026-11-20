"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "../petly-product.module.css";

type DemoLanguage = "zh" | "en";

const routeLabels: Record<string, string> = {
  login: "Login",
  home: "Home",
  walks: "Walks",
  "walk-live": "Live walk",
  "walk-detail": "Walk detail",
  care: "Care",
  "book-vet": "Book vet",
  "book-vaccine": "Book vaccine",
  "appointment-confirm": "Confirmed",
  appointment: "Appointment",
  subscription: "Petly Plus",
  consult: "Vet advice",
  "consult-chat": "Vet chat",
  profile: "Profile",
  pets: "My pets",
  pet: "Pet profile",
  "personal-info": "Personal info",
  notifications: "Notifications",
  settings: "Settings",
  credits: "Credits",
};

export function PetlyInteractiveDemo() {
  const { t } = useLanguage();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [language, setLanguage] = useState<DemoLanguage>("zh");
  const [demoSource, setDemoSource] = useState("/petly-demo/index.html#/home");
  const [reloadKey, setReloadKey] = useState(0);
  const [currentRoute, setCurrentRoute] = useState("Home");
  const [activePet, setActivePet] = useState("Milo");

  useEffect(() => {
    const syncStatus = () => {
      const frameDocument = frameRef.current?.contentDocument;
      const route = frameDocument?.body?.dataset.route;
      const pet = frameDocument?.body?.dataset.activePet;
      if (route) setCurrentRoute(routeLabels[route] ?? route);
      if (pet) setActivePet(pet === "luna" ? "Luna" : "Milo");
    };

    syncStatus();
    const timer = window.setInterval(syncStatus, 300);
    return () => window.clearInterval(timer);
  }, [demoSource]);

  function switchLanguage(nextLanguage: DemoLanguage) {
    if (nextLanguage === language) return;
    const currentHash = frameRef.current?.contentWindow?.location.hash || "#/home";
    const page = nextLanguage === "en" ? "index-en.html?lang=en" : "index.html";
    setLanguage(nextLanguage);
    setDemoSource(`/petly-demo/${page}${currentHash}`);
  }

  function restart() {
    const page = language === "en" ? "index-en.html?lang=en" : "index.html";
    setDemoSource(`/petly-demo/${page}#/home`);
    setReloadKey((value) => value + 1);
  }

  return (
    <div className={styles.stationScene}>
      <div className={styles.stationMachine}>
        <span className={styles.stationHandle} aria-hidden="true" />
        <header className={styles.stationTopbar}>
          <div className={styles.stationBrand}>
            <span className={styles.stationIndex}>05</span>
            <div><small>{t("PETLY / mobile care system")}</small><strong>{t("Care station")}</strong></div>
          </div>
          <p className={styles.stationLive}><i aria-hidden="true" /> {t("Prototype ready / input enabled")}</p>
          <div className={styles.stationLamps} aria-label={t("System status")}><i /><i /><i /></div>
        </header>

        <div className={styles.stationBody}>
          <aside className={styles.stationRail}>
            <section className={`${styles.stationPlate} ${styles.stationPetPlate}`}>
              <p className={styles.stationKicker}>{t("Active pet / 01")}</p>
              <div className={styles.stationPetRow}>
                <span className={styles.stationPetPhoto}>
                  <Image src="/petly-demo/assets/portrait-of-a-golden-retriever-on-the.jpg" alt="" fill sizes="76px" />
                </span>
                <span className={styles.stationPetName}><strong>{activePet}</strong><small>{t("Active care profile")}</small></span>
              </div>
              <div className={styles.stationChips}><span>{t("walks")}</span><span>{t("vaccines")}</span><span>{t("care")}</span></div>
            </section>

            <section className={styles.stationPlate}>
              <p className={styles.stationKicker}>{t("Live readout")}</p>
              <div className={styles.stationReadout}><span>{t("Current route")}</span><strong>{t(currentRoute)}</strong></div>
              <div className={styles.stationReadout}><span>{t("Language")}</span><strong>{language === "zh" ? "中文" : "English"}</strong></div>
              <div className={styles.stationReadout}><span>{t("Input")}</span><strong className={styles.stationAccent}>{t("Clickable")}</strong></div>
            </section>

            <section className={`${styles.stationPlate} ${styles.stationPlateDark}`}>
              <p className={styles.stationKicker}>{t("Session")}</p>
              <div className={styles.stationSession}><strong>08<small> / 20</small></strong><span>{t("linked routes")}</span></div>
            </section>
          </aside>

          <main className={styles.stationDock}>
            <span className={styles.stationDockLip} aria-hidden="true" />
            <div className={styles.deviceStage}>
              <div className={styles.deviceScaler}>
                <div className={styles.deviceFrame}>
                  <iframe
                    key={reloadKey}
                    ref={frameRef}
                    title={language === "zh" ? "PETLY 中文交互原型" : "PETLY English interactive prototype"}
                    src={demoSource}
                    className={styles.demoFrame}
                  />
                </div>
              </div>
              <p className={styles.stationDeviceLabel}>{t("Prototype data only · simulated states")}</p>
            </div>
          </main>

          <aside className={styles.stationRail}>
            <section className={styles.stationPlate}>
              <p className={styles.stationKicker}>{t("Care queue / tickets")}</p>
              <div className={styles.stationQueue}>
                <div><i /><span><strong>{t("Walks")}</strong><small>{t("Daily activity path")}</small></span><em>{t("ready")}</em></div>
                <div><i /><span><strong>{t("Vaccines")}</strong><small>{t("Next record due")}</small></span><em>{t("soon")}</em></div>
                <div><i /><span><strong>{t("Appointments")}</strong><small>{t("Vet + clinic slot")}</small></span><em>{t("confirm")}</em></div>
                <div><i /><span><strong>{t("Vet advice")}</strong><small>{t("Open consultation")}</small></span><em>{t("active")}</em></div>
              </div>
            </section>

            <section className={`${styles.stationPlate} ${styles.stationPlateDark} ${styles.stationStatement}`}>
              <p className={styles.stationKicker}>{t("Operator note")}</p>
              <strong>{t("One pet.")}<br />{t("One record.")}</strong>
              <p>{t("The active pet stays visible while walks, appointments and advice move through the same care system.")}</p>
              <div className={styles.stationLines}>
                <div><span>01 / {t("profile")}</span><span>{activePet}</span></div>
                <div><span>02 / {t("route")}</span><span>{t(currentRoute)}</span></div>
                <div><span>03 / {t("language")}</span><span>{language === "zh" ? "中文" : "English"}</span></div>
              </div>
            </section>
          </aside>
        </div>

        <footer className={styles.stationDeck}>
          <div className={styles.stationToggle} role="group" aria-label={t("Prototype language")}>
            <button type="button" aria-pressed={language === "zh"} onClick={() => switchLanguage("zh")}>中文</button>
            <button type="button" aria-pressed={language === "en"} onClick={() => switchLanguage("en")}>English</button>
          </div>
          <button type="button" className={styles.stationButton} onClick={restart}>{t("Restart")} ↺</button>
          <span className={styles.stationButton}>390 × 844</span>
          <span className={styles.stationDeckSpacer} />
          <span className={styles.stationDeckNote}><i aria-hidden="true" /> {t("Care station / prototype mode")}</span>
        </footer>

        <span className={styles.stationFootLeft} aria-hidden="true" />
        <span className={styles.stationFootRight} aria-hidden="true" />
      </div>
    </div>
  );
}
