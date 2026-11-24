const About = () => (
  <section className="stack">
    <h2>About anecdote app</h2>
    <div className="bento">
      <div className="card wide">
        <p className="eyebrow">According to Wikipedia:</p>
        <em className="lede">
          An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more
          general than the brief tale itself, such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a
          person, place, or thing through the concrete details of a short narrative.
          An anecdote is &quot;a story with a point.&quot;
        </em>
      </div>
      <div className="card-soft">
        <p className="eyebrow">This app</p>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
      <div className="card-brand">
        <p className="eyebrow">Source code</p>
        <p>See <a href="https://github.com/fullstack-hy2020/routed-anecdotes">https://github.com/fullstack-hy2020/routed-anecdotes</a> for the source code.</p>
      </div>
    </div>
  </section>
);

export default About;
