import db from '../database/models';
// import LeaderBoardInterface from '../interfaces/leaderboard.interface';

require('dotenv/config');

const homeTeamQuery = `
SELECT
    T.team_name as "name",
    (3 * SUM(home_team_goals > away_team_goals))
      + SUM(home_team_goals = away_team_goals) AS "totalPoints",
COUNT(team_name) AS "totalGames",
    SUM(home_team_goals > away_team_goals) AS "totalVictories",
    SUM(home_team_goals = away_team_goals) AS "totalDraws",
    SUM(home_team_goals < away_team_goals) AS "totalLosses",
    SUM(home_team_goals) AS "goalsFavor",
    SUM(away_team_goals) AS "goalsOwn",
    SUM(home_team_goals) - SUM(away_team_goals) AS "goalsBalance",
    ROUND((((3 * SUM(home_team_goals > away_team_goals) + SUM(home_team_goals = away_team_goals))
    / (COUNT(team_name) * 3)) * 100), 2) AS "efficiency"
  FROM
    TRYBE_FUTEBOL_CLUBE.matches AS M
  JOIN
    TRYBE_FUTEBOL_CLUBE.teams AS T
  ON
    M.home_team = T.id
  WHERE
    M.in_progress = 0
  GROUP BY
    M.home_team
  ORDER BY
    (3 * SUM(home_team_goals > away_team_goals)) + SUM(home_team_goals = away_team_goals) desc,
    SUM(home_team_goals) - SUM(away_team_goals) desc,
    SUM(home_team_goals) desc,
    SUM(away_team_goals) desc;`;

const awayTeamQuery = `
SELECT
    T.team_name as "name",
    (3 * SUM(away_team_goals > home_team_goals ))
      + SUM(away_team_goals = home_team_goals ) AS "totalPoints",
COUNT(team_name) AS "totalGames",
    SUM(away_team_goals  > home_team_goals ) AS "totalVictories",
    SUM(away_team_goals  = home_team_goals) AS "totalDraws",
    SUM(away_team_goals  < home_team_goals ) AS "totalLosses",
    SUM(away_team_goals) AS "goalsFavor",
    SUM(home_team_goals ) AS "goalsOwn",
    SUM(away_team_goals) - SUM(home_team_goals) AS "goalsBalance",
    ROUND((((3 * SUM(away_team_goals  > home_team_goals ) + SUM(away_team_goals = home_team_goals))
    / (COUNT(team_name) * 3)) * 100), 2) AS "efficiency"
  FROM
    TRYBE_FUTEBOL_CLUBE.matches AS M
  JOIN
    TRYBE_FUTEBOL_CLUBE.teams AS T
  ON
    M.away_team = T.id
  WHERE
    M.in_progress = 0
  GROUP BY
    M.away_team
  ORDER BY
    (3 * SUM(away_team_goals > home_team_goals)) + SUM(away_team_goals = home_team_goals ) desc,
    SUM(away_team_goals ) - SUM(home_team_goals) desc,
    SUM(away_team_goals ) desc,
    SUM(home_team_goals) desc;
`;

export default class TeamsService {
  getHomeTeam = async () => {
    const [allTeams] = await db.query(homeTeamQuery);
    return allTeams;
  };

  getAwayTeam = async () => {
    const [allTeams] = await db.query(awayTeamQuery);
    return allTeams;
  };
}
