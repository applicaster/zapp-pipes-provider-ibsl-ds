import axios from 'axios';

let urlScheme = null;
let linkUrl;

export default async function getTeams(url) {

  if (url) {
    const { board_id, cYear = 0, url_scheme = 'ibsl', link_url } = url;
    const finalUrl = `https://www.basket.co.il/ws/ws.asmx/Teams?board_id=${board_id}&cYear=${cYear}`;
    urlScheme = url_scheme;
    linkUrl = link_url;
    return await axios
      .get(finalUrl)
      .then(teams => teams.data)
      .then(_handleTeams)
      .catch(err => _errorObject);
  }

  return Promise.reject('no url passed');
}

const _errorObject = {
  id: 'teams',
  title: 'קבוצות',
  type: {
    value: 'feed'
  },
  entry: [],
  extensions: {}
}

function _handleTeams({ teams }) {
  return {
    id: 'teams',
    title: 'קבוצות',
    type: {
      value: 'feed'
    },
    entry: teams.map(team => ({
      type: {
        value: 'link'
      },
      id: team.team_year_id,
      title: team.team_shortName.replace(/&#34;/g, '"').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
      summary: team.team.replace(/&#34;/g, '"').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
      author: {
        name: ""
      },
      link: {
        href: `${linkUrl}${team.team_year_id}&app=true&showContext=true`,
        rel: "alternate"
      },
      media_group: [
        {
          type: "image",
          media_item: [
            {
              src: `https://basket.co.il${team.team_icon2}`,
              key: "image_base",
              type: "image"
            }
          ]
        }
      ],
      extensions: {
        TeamUID: team.TeamUID,
        year_id: team.year_id,
        place: team.place,
        games: team.games,
        win: team.win,
        lose: team.lose,
        team_scores: team.team_scores,
        rival_scores: team.rival_scores,
        points: team.points,
        team_pic: `https://basket.co.il${team.team_pic}`,
        team_email: team.team_email,
        team_phone: team.team_phone,
        team_address: team.team_address.replace(/&#34;/g, '"').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
        team_sponsers: team.team_sponsers.replace(/&#34;/g, '"').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
        team_social_link: team.team_social_link,
        team_twitter: team.team_twitter,
        team_insta: team.team_insta,
        team_youtube: team.team_youtube,
        ticket_link: team.ticket_link,
        team_subscribe_url: team.team_subscribe_url,
        team_email1: team.team_email1,
        team_phone1: team.team_phone1,
        team_address1: team.team_address1,
        team_sponsers1: team.team_sponsers1,
        team_social_link1: team.team_social_link1,
        team_twitter1: team.team_twitter1,
        team_insta1: team.team_insta1,
        team_youtube1: team.team_youtube1,
        COACHES: team.COACHES.replace(/&#34;/g, '"').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
      }
    }))
  }

}