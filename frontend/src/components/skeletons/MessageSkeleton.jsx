import "./MessageSkeleton.css";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="message-skeleton-container">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`skeleton-message ${idx % 2 === 0 ? "start" : "end"}`}
        >
          <div className="skeleton-avatar-container">
            <div className="skeleton-avatar shimmer" />
          </div>

          <div className="skeleton-meta">
            <div className="skeleton-name shimmer" />
          </div>

          <div className="skeleton-bubble shimmer" />
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
