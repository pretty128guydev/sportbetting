import React from "react";
import { Row, Col, Avatar, Badge, Card, Space } from "antd";
import { EnvironmentTwoTone, SkinTwoTone } from "@ant-design/icons";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// Components
import { TeamStatsLine, TeamStatsPie } from "./TeamStats";
import ErrorComponent from "../gadgets/Error";
// Interface
import { TeamInterface } from "../interfaces/Interfaces";
ChartJS.register(ArcElement, Tooltip, Legend);

interface TeamCardProps {
  teamData: TeamInterface | null;
}

export const MLBTeamCard: React.FC<TeamCardProps> = ({ teamData }) => {
  if (!teamData) return <ErrorComponent errStr="Loading..." />;

  const data = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        label: "Team Performance",
        data: [teamData.wins, teamData.loss],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <Row style={{ marginTop: "10px" }}>
      <Col span={4} style={{ paddingRight: "10px" }}>
        <Badge.Ribbon text="Team Info">
          <Card style={{ width: "100%" }}>
            <div>
              <div style={{ marginTop: 20 }}>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    src={teamData.logo}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  />
                </Row>
                <Space size="large">
                  <p>
                    <SkinTwoTone /> {teamData.abv}
                  </p>
                  <p>
                    <EnvironmentTwoTone /> {teamData.city}
                  </p>
                </Space>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <Pie data={data} />
              </div>
            </div>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col span={20}>
        <Badge.Ribbon text="Team Stats">
          <Card style={{ width: '100%' }}>
            <Row gutter={24}>
              <Col span={6}>
                <TeamStatsPie title={'BaseRunning'} data={teamData.stats.MLB?.BaseRunning} />
              </Col>
              <Col span={6}>
                <TeamStatsPie title={'Fielding'} data={teamData.stats.MLB?.Fielding} />
              </Col>
              <Col span={6}>
                <TeamStatsPie title={'Hitting'} data={teamData.stats.MLB?.Hitting} />
              </Col>
              <Col span={6}>
                <TeamStatsPie title={'Pitching'} data={teamData.stats.MLB?.Pitching} />
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Row>
  );
};

export const NFLTeamCard: React.FC<TeamCardProps> = ({ teamData }) => {
  if (!teamData) return <ErrorComponent errStr="Loading..." />;

  const data = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        label: "Team Performance",
        data: [teamData.wins, teamData.loss],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <Row style={{ marginTop: "10px" }}>
      <Col span={4} style={{ paddingRight: "10px" }}>
        <Badge.Ribbon text="Team Info">
          <Card style={{ width: "100%" }}>
            <div>
              <div style={{ marginTop: 10 }}>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    src={teamData.logo}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  />
                </Row>
                <Space size="large">
                  <p>
                    <SkinTwoTone /> {teamData.abv}
                  </p>
                  <p>
                    <EnvironmentTwoTone /> {teamData.city}
                  </p>
                </Space>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <Pie data={data} style={{maxHeight: '15vh'}} />
              </div>
            </div>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col span={20}>
        <Badge.Ribbon text="Team Stats">
          <Card style={{ width: '100%' }}>
            <Row gutter={24}>
              <Col span={4}>
                <TeamStatsPie title={'Receiving'} data={teamData.stats.NFL?.Receiving} />
              </Col>
              <Col span={4}>
                <TeamStatsPie title={'Rushing'} data={teamData.stats.NFL?.Rushing} />
              </Col>
              <Col span={4}>
                <TeamStatsPie title={'Punting'} data={teamData.stats.NFL?.Punting} />
              </Col>
              <Col span={4}>
                <TeamStatsPie title={'Passing'} data={teamData.stats.NFL?.Passing} />
              </Col>
              <Col span={4}>
                <TeamStatsPie title={'Kicking'} data={teamData.stats.NFL?.Kicking} />
              </Col>
              <Col span={4}>
                <TeamStatsPie title={'Defense'} data={teamData.stats.NFL?.Defense} />
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Row>
  );
};

export const NHLTeamCard: React.FC<TeamCardProps> = ({ teamData }) => {
  if (!teamData) return <ErrorComponent errStr="Loading..." />;

  const data = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        label: "Team Performance",
        data: [teamData.wins, teamData.loss],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <Row style={{ marginTop: "10px" }}>
      <Col span={4} style={{ paddingRight: "10px" }}>
        <Badge.Ribbon text="Team Info">
          <Card style={{ width: "100%" }}>
            <div>
              <div style={{ marginTop: 20 }}>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    src={teamData.logo}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  />
                </Row>
                <Space size="large">
                  <p>
                    <SkinTwoTone /> {teamData.abv}
                  </p>
                  <p>
                    <EnvironmentTwoTone /> {teamData.city}
                  </p>
                </Space>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Pie data={data} />
              </div>
            </div>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col span={20}>
        <Badge.Ribbon text="Team Stats">
          <Card style={{ width: '100%' }}>
            <Row gutter={24}>
              <Col span={12}>
                <TeamStatsLine title={'Line View'} data={teamData.stats.NHL} />
              </Col>
              <Col span={12}>
                <TeamStatsPie title={'Pie View'} data={teamData.stats.NHL} />
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Row>
  );
};

export const NBATeamCard: React.FC<TeamCardProps> = ({ teamData }) => {
  if (!teamData) return <ErrorComponent errStr="Loading..." />;

  const data = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        label: "Team Performance",
        data: [teamData.wins, teamData.loss],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <Row style={{ marginTop: "10px" }}>
      <Col span={4} style={{ paddingRight: "10px" }}>
        <Badge.Ribbon text="Team Info">
          <Card style={{ width: "100%" }}>
            <div>
              <div style={{ marginTop: 20 }}>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    src={teamData.logo}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  />
                </Row>
                <Space size="large">
                  <p>
                    <SkinTwoTone /> {teamData.abv}
                  </p>
                  <p>
                    <EnvironmentTwoTone /> {teamData.city}
                  </p>
                </Space>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <Pie data={data} />
              </div>
            </div>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col span={20}>
        <Badge.Ribbon text="Team Stats">
          <Card style={{ width: '100%' }}>
            <Row gutter={24}>
              <Col span={12}>
                <TeamStatsPie title={'Offensive'} data={teamData.stats.NBA?.offensive} />
              </Col>
              <Col span={12}>
                <TeamStatsPie title={'Deffensive'} data={teamData.stats.NBA?.defensive} />
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Row>
  );
};