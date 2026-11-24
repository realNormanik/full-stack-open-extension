import { useNavigate } from "react-router";

import { useField, useAnecdotes } from "../hooks";

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes();
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <section className="stack">
      <h2>Create a new anecdote</h2>
      <form className="card" onSubmit={handleSubmit}>
        <div className="fields">
          <label className="control">
            Content
            <input className="field" name="content" {...content} />
          </label>
          <label className="control">
            Author
            <input className="field" name="author" {...author} />
          </label>
          <label className="control">
            URL for more info
            <input className="field" name="info" {...info} />
          </label>
        </div>
        <div className="actions">
          <button className="create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor"
              width="18"
              height="18"
            >
              <path d="M539.3 64.1C549.2 63.3 558.9 67.1 565.9 74.1C572.9 81.1 576.7 90.8 575.9 100.7C571.9 150 558.5 226.9 529.6 300.4C527.8 304.9 524.1 308.3 519.4 309.7L438.5 334C434.6 335.2 432 338.7 432 342.8C432 347.9 436.1 352 441.2 352L479.8 352C491.8 352 499.5 364.8 493.3 375.1C489.3 381.8 485 388.3 480.6 394.7C478.6 397.6 475.6 399.7 472.2 400.8L374.5 430C370.6 431.2 368 434.7 368 438.8C368 443.9 372.1 448 377.2 448L393.2 448C407.8 448 414.2 465.4 402 473.4C334 518.4 264.3 516.7 219.6 504.7C206.9 501.3 195.6 494.8 185.2 486.8L112 560C103.2 568.8 88.8 568.8 80 560C71.2 551.2 71.2 536.8 80 528L160 448L160.5 448.5C161.2 447.2 162.1 446 163.2 444.9L320 288C328.8 279.2 328.8 264.8 320 256C311.2 247.2 296.8 247.2 288 256L153.7 390.2C144.8 399.1 129.7 394.6 128.7 382C124.4 328.8 138 258.9 201.3 195.6C292.4 104.5 455.5 70.9 539.2 64.1z" />
            </svg>
            create
          </button>
          <button className="ghost" type="button" onClick={handleReset}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor"
              width="18"
              height="18"
            >
              <path d="M88 256L232 256C241.7 256 250.5 250.2 254.2 241.2C257.9 232.2 255.9 221.9 249 215L202.3 168.3C277.6 109.7 386.6 115 455.8 184.2C530.8 259.2 530.8 380.7 455.8 455.7C380.8 530.7 259.3 530.7 184.3 455.7C174.1 445.5 165.3 434.4 157.9 422.7C148.4 407.8 128.6 403.4 113.7 412.9C98.8 422.4 94.4 442.2 103.9 457.1C113.7 472.7 125.4 487.5 139 501C239 601 401 601 501 501C601 401 601 239 501 139C406.8 44.7 257.3 39.3 156.7 122.8L105 71C98.1 64.2 87.8 62.1 78.8 65.8C69.8 69.5 64 78.3 64 88L64 232C64 245.3 74.7 256 88 256z" />
            </svg>
            reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateNew;
