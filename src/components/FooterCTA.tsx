"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./FooterCTA.module.css";

interface LogLine {
  text: string;
  type: "input" | "info" | "success" | "warning" | "system";
}

const DEPLOY_LOGS: LogLine[] = [
  { text: "$ aws cloudformation deploy --stack-name acd-surat-2026", type: "input" },
  { text: "⠋ Waiting for changeset to be created...", type: "system" },
  { text: "✔ CloudFormation changeset created successfully.", type: "success" },
  { text: "Initiating deployment for 'AWS-Community-Day-Surat-2026' stack...", type: "info" },
  { text: "CREATE_IN_PROGRESS | AWS::ECS::Cluster | ECSCluster", type: "info" },
  { text: "CREATE_IN_PROGRESS | AWS::Cognito::UserPool | AttendeesAuth", type: "info" },
  { text: "CREATE_COMPLETE    | AWS::ECS::Cluster | ECSCluster", type: "success" },
  { text: "CREATE_IN_PROGRESS | AWS::DynamoDB::Table | RegistrationDb", type: "info" },
  { text: "CREATE_COMPLETE    | AWS::DynamoDB::Table | RegistrationDb", type: "success" },
  { text: "CREATE_COMPLETE    | AWS::Cognito::UserPool | AttendeesAuth", type: "success" },
  { text: "Updating DNS records with Route53 routing policies...", type: "info" },
  { text: "🚀 STACK DEPLOYMENT COMPLETE!", type: "success" },
  { text: "--------------------------------------------------------", type: "system" },
  { text: "STATUS: ACTIVE  |  VENUE: SURAT, GUJARAT  |  DATE: OCT 3", type: "system" },
  { text: "--------------------------------------------------------", type: "system" },
];

const SCALE_LOGS: LogLine[] = [
  { text: "$ kubectl scale deployment/acd-builders --replicas=1000", type: "input" },
  { text: "scaling replica set acd-builders-5d9f78... to 1000 pods", type: "system" },
  { text: "⠋ Provisioning EC2 Auto Scaling capacity group (ap-south-1)...", type: "info" },
  { text: "✔ Provisioned 40 new Spot Instances in ap-south-1a/b", type: "success" },
  { text: "HorizontalPodAutoscaler triggered: load averaging 84%", type: "warning" },
  { text: "Deploying ECS tasks across multi-AZ container group...", type: "info" },
  { text: "✔ ECS Tasks successfully stabilized. Current replicas: 1000", type: "success" },
  { text: "⚡ Capacity scale complete. Ready for 1000+ cloud builders!", type: "success" },
];

const SECURE_LOGS: LogLine[] = [
  { text: "$ npx snyk test && aws securityhub get-insights", type: "input" },
  { text: "✔ Tested 42 dependencies for vulnerabilities. None found.", type: "success" },
  { text: "Running AWS IAM analyzer checks for stack roles...", type: "info" },
  { text: "✔ IAM policies verified: Least Privilege principle active.", type: "success" },
  { text: "Configuring AWS WAF v2 Core Ruleset shielding APIs...", type: "info" },
  { text: "AWS Shield Advanced: Active monitoring DDoS mitigation...", type: "info" },
  { text: "🔒 SECURITY SCAN COMPLETED: 100% SECURE. ALL AUDITS PASSED.", type: "success" },
];

export default function FooterCTA() {
  const [terminalLogs, setTerminalLogs] = useState<LogLine[]>([
    { text: "AWS Builders Console CLI v1.0.0", type: "system" },
    { text: "Click any command below to execute on the infrastructure...", type: "info" },
  ]);
  const [runningCmd, setRunningCmd] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const runCommand = async (cmdType: "deploy" | "scale" | "secure") => {
    if (runningCmd) return;
    setRunningCmd(true);
    setTerminalLogs([]);

    const logSet = 
      cmdType === "deploy" ? DEPLOY_LOGS : 
      cmdType === "scale" ? SCALE_LOGS : SECURE_LOGS;

    for (let i = 0; i < logSet.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i === 0 ? 300 : 150));
      setTerminalLogs((prev) => [...prev, logSet[i]]);
    }
    setRunningCmd(false);
  };

  useEffect(() => {
    if (runningCmd && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [terminalLogs, runningCmd]);

  return (
    <section className={styles.footerCta}>
      <div className={styles.gridPattern} />

      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Left Column: Text & CTA */}
          <div className={styles.textCol}>
            <ScrollReveal className={styles.revealCol}>
              <h2 className={styles.title}>
                Meet the people building what&apos;s next with AWS
              </h2>
              
              <div className={styles.action}>
                <a
                  href="#"
                  className={`btn ${styles.registerBtn}`}
                >
                  REGISTER NOW
                  <span className={styles.chevron}>&gt;</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Fantastic Interactive Builder Terminal Simulator */}
          <div className={styles.codeCol}>
            <ScrollReveal className={styles.codeReveal} delay={2}>
              <div className={styles.terminalContainer}>
                {/* Terminal Header */}
                <div className={styles.terminalHeader}>
                  <div className={styles.dots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <span className={styles.terminalTitle}>builder@aws-surat-2026: ~</span>
                </div>

                {/* Terminal Display */}
                <div className={styles.terminalScreen}>
                  {terminalLogs.map((line, idx) => (
                    <div key={idx} className={`${styles.logLine} ${styles[line.type]}`}>
                      {line.text}
                    </div>
                  ))}
                  {runningCmd && <div className={styles.cursor} />}
                  <div ref={terminalEndRef} />
                </div>

                {/* Interactive Controls */}
                <div className={styles.terminalControls}>
                  <button 
                    onClick={() => runCommand("deploy")} 
                    disabled={runningCmd}
                    className={styles.cmdBtn}
                  >
                    🚀 deploy_event
                  </button>
                  <button 
                    onClick={() => runCommand("scale")} 
                    disabled={runningCmd}
                    className={styles.cmdBtn}
                  >
                    🛠️ scale_infra
                  </button>
                  <button 
                    onClick={() => runCommand("secure")} 
                    disabled={runningCmd}
                    className={styles.cmdBtn}
                  >
                    🔒 secure_gate
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
