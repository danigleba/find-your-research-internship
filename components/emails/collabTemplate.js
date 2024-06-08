export default function collabTemplate({ author, user, title, comment }) {
  return (
    <div className="text-black"> 
      <p>Hi {author.name}</p>
      <p>Congrats!</p>
      <p><b>{user.name}</b>, a {user.position} from {user.institution}, <b>is interested in your expertise</b> in {title} and would like you to reach out to collaborate on his project.</p>
      <p>You can <b>get it touch</b> with them by writing at {user.email}.</p>
      {comment != "" && (<p>They also shared this message for you: "{comment}".</p>)}
      <p>Work together, make better science.</p>
      <p><i>Portiko Team</i></p>
    </div>
  )
}
