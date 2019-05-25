import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog as EvergreenDialog, Pane } from "evergreen-ui";

const Dialog = ({ children, confirmLabel, onConfirm, title, trigger }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <Pane>
        <EvergreenDialog
          confirmLabel={confirmLabel}
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          onConfirm={() => {
            onConfirm();
            setIsShown(false);
          }}
          title={title}
        >
          {children}
        </EvergreenDialog>
      </Pane>
      <div onClick={() => setIsShown(true)}>{trigger}</div>
    </div>
  );
};

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  title: PropTypes.string.isRequired,
  trigger: PropTypes.node.isRequired
};

Dialog.defaultProps = {
  onConfirm: close => close()
};

export default Dialog;
