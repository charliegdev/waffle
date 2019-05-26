import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, SelectMenu as EvergreenSelectMenu } from "evergreen-ui";

const SelectMenu = ({ title, options, onSelect }) => {
  const [selected, setSelected] = useState(options[0].value);

  const selectItem = item => {
    setSelected(item.value);
    onSelect(item.value);
  };

  return (
    <EvergreenSelectMenu title={title} options={options} selected={selected} onSelect={selectItem}>
      <Button>{selected || "Select..."}</Button>
    </EvergreenSelectMenu>
  );
};

SelectMenu.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SelectMenu;
