import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, SelectMenu as EvergreenSelectMenu } from "evergreen-ui";

const SelectMenu = ({ initial, title, options, onSelect }) => {
  const [selected, setSelected] = useState(initial || options[0].value);

  const selectItem = item => {
    setSelected(item.value);
    onSelect(item.value);
  };

  return (
    <EvergreenSelectMenu title={title} options={options} selected={selected} onSelect={selectItem}>
      <Button iconBefore="caret-left" iconAfter="caret-right" intent="success">
        {selected || "Select..."}
      </Button>
    </EvergreenSelectMenu>
  );
};

SelectMenu.propTypes = {
  initial: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired
};

SelectMenu.defaultProps = {
  initial: null
};

export default SelectMenu;
