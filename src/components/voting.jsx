import { connect } from 'react-redux'
import { Vote } from '../actions/vote'
import { LeaveParty } from '../actions/leaveParty'
import { routes } from '../routes'
import consts from '../constants'

import _ from 'lodash'

const option = (n) => (
  <option key={n} value={n}>{n}</option>
)

const voteLi = (v) => (
  <li key={v.uuid}>{v.points} {v.userName}</li>
)

const shouldShowVotes = (votes, userId) => !_.isNil(_.find(votes, (v) => v.userId === userId))

const If = ({children, test}) => {
  if (test) {
    return children
  } else {
    return false
  }
}

let pointInput
const view = ({values, vote, votes, leaveParty, userId, partyId, userName}) => (
  <div>
    <select ref={el => pointInput = el}>
      {_.map(values, option)}
    </select>
    <button onClick={vote(userId, partyId, userName)}>Vote</button>

    <If test={shouldShowVotes(votes, userId)}>
      <ul>{_.map(votes, voteLi)}</ul>
    </If>

    <a href="#" onClick={leaveParty(partyId)}>Leave this party</a>
    <div>{window.location.origin+'/#'+routes.joinPath.replace(':partyId', partyId)}</div>
  </div>
)

const mapToProps = (state) => ({
  votes: state.votes,
  values: consts.Scales["Fibonacci"],
  userId: state.currentUser.id,
  partyId: state.party.uuid,
  userName: state.currentUser.userName,
})

const mapToDispatch = (dispatch) => ({
  vote: (userId, partyId, userName) => () => dispatch(Vote(pointInput.value, userId, partyId, userName)),
  leaveParty: (partyId) => (e) => {
    e.preventDefault()
    dispatch(LeaveParty(partyId))
  }
})

export const Voting = connect(mapToProps, mapToDispatch)(view)
