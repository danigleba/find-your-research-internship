export default function feedbackRequestTemplate({ user }) {
    return (
      <div className="text-black"> 
        <p>Hi {user.name.split(" ")[0]}</p>
        <p>I’m Dani from Portiko, the site to find research collaborations.</p>
        <p>As a teen, I bet you didn’t imagine all the office work that comes with being a researcher.<br/>Between finding collaborations, getting funded, filling out paperwork, etc.<br/>You almost have no time to do research.</p>
        <p>At Portiko, we want to help with all that boring stuff.<br/>So you can focus on publishing amazing papers.</p>
        <p>Ana and I would love to get on a quick call to learn about the problems stopping you from publishing even more amazing papers (and how we can solve them).</p>
        <p>Please let me know when would be a good time, and I’ll send a calendar invite.</p>
        <p>Many, many thanks :)</p>
        <p><i>Dani</i></p>
      </div>
    )
  }
  