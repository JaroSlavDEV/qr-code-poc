import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export const DIALOG_CONTAINER_ID = "dialog-window";

const container = document.createElement("div");
container.id = DIALOG_CONTAINER_ID;
document.body.appendChild(container);

export function toClasses(...args) {
  return args.filter((item) => !!item && typeof item === "string").join(" ");
}

export const useOnClickOutside = function (
  ref,
  cb,
  active = true,
  skipTargets = [] //
) {
  const handler = React.useCallback(
    ({ target }) => {
      for (let i = 0; i < skipTargets.length; i++) {
        if (target.closest(skipTargets[i])) {
          return;
        }
      }
      if (ref && ref.current && !ref.current.contains(target)) {
        cb(target);
      }
    },
    [ref, cb, skipTargets]
  );

  React.useEffect(() => {
    if (active) {
      document.removeEventListener("click", handler, { capture: true });
      document.addEventListener("click", handler, { capture: true });
    }
    return () => document.removeEventListener("click", handler);
  }, [ref, active, handler]);
};

export const DialogBase = ({
  title,
  closeIcon,
  children,
  onClose = () => {},
  autoClose = true,
  className = "",
  size,
}) => {
  const contentContainer = useRef(null);

  useOnClickOutside(contentContainer, onClose, autoClose);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return (
    <div className={toClasses("dialog-wrap", size, className)}>
      <div ref={contentContainer} className="dialog-content">
        <div className="dialog-header">
          {title && <div className="dialog-title">{title}</div>}
          {closeIcon && (
            <div className="dialog-close-btn" onClick={onClose}>
              X
            </div>
          )}
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>
  );
};

export const Dialog = (props) => {
  return props.isOpened
    ? createPortal(<DialogBase {...props} />, container)
    : null;
};

