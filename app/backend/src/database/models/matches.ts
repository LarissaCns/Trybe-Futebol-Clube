import { STRING, INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: number;
}

Matches.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    homeTeam: {
        type: INTEGER,
        allowNull: false,
    },
    homeTeamGoals: {
        type: INTEGER,
        allowNull: false,
    },
    awayTeam: {
        type: INTEGER,
        allowNull: false,
    },
    awayTeamGoals: {
        type: INTEGER,
        allowNull: false,
    },
    inProgress: {
        type: BOOLEAN,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    });

    Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'idhomeTeam' });
    Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'idAwayTeam' });
    Matches.belongsTo(Teams, {foreignKey: 'homeTeam', as: 'teamHome'})
    Matches.belongsTo(Teams, {foreignKey: 'awayTeam', as: 'teamAway'})

export default Matches;