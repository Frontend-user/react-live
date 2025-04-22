import { useState, useEffect } from "react";
import "./styles.css";

export function App() {
  return <Comments />;
}

const initialComments = ["comment1", "comment2", "comment3"];

interface CommentEditorProps {
  isShow: boolean;
  index?: number;
  initialComment?: string;
  handleAddComment: (comment: string) => void;
  handleChangeComment: (index: number, comment: string) => void;
  onClose: () => void;
}
const CommentEditor = ({
  isShow,
  index,
  initialComment,
  handleAddComment,
  handleChangeComment,
  onClose,
}: CommentEditorProps) => {
  const [value, setValue] = useState(initialComment || "");

  useEffect(() => {
    setValue(initialComment || "");
  }, [initialComment]);

  const handleClick = () => {
    if (index !== undefined) {
      handleChangeComment(index, value);
    } else {
      handleAddComment(value);
    }
  };

  if (!isShow) {
    return null;
  }
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleClick}>{index ? "Изменить" : "Добавить"}</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
};

export const Comments = () => {
  const [showForm, setShowForm] = useState(false);
  const [index, setIndex] = useState<number | undefined>();
  const [comments, setComments] = useState(initialComments);

  const handleAddComment = (comment: string) => {
    setComments([...comments, comment]);
    setShowForm(false);
  };

  const handleChangeComment = (index: number, comment: string) => {
    const newComments = [...comments];
    newComments[index] = comment;
    setComments(newComments);
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <div
          key={index}
          onClick={() => {
            setIndex(index);
            setShowForm(true);
          }}
        >
          <p>{comment}</p>
        </div>
      ))}
      <button onClick={() => setShowForm(true)}>Добавить комментарий</button>
      <CommentEditor
        isShow={showForm}
        handleAddComment={handleAddComment}
        handleChangeComment={handleChangeComment}
        onClose={() => setShowForm(false)}
        index={index}
        initialComment={index !== undefined ? comments[index] : undefined}
      />
    </div>
  );
};
