export default function collabTemplate({ author, user, title, comment }) {
  return (
    <div className="text-black"> 
      <p>Hi {user.name}</p>
      <p>Congrats!</p>
      <p><b>{author.name}</b>, a {author.position} from {author.institution}, <b>wants to collaborate</b> on your {title}.</p>
      <p>You can <b>get it tough</b> with them by writing at {user.email}.</p>
      {comment != "" && (<p>They also shared this message for you: "{comment}".</p>)}
      <p>Work together, make better science.</p>
      <p><i>Portiko Team</i></p>
    </div>
  )
}
