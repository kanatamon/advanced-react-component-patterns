import React from "react";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: false };
  }

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  /*
    ใช้วิธิีีรับ props.render และส่ง state และ handler เป็น parameter
    user คนที่ใช้ Toggle ก็จะต้องรู้เพียงแค่ว่า Toggle มี state และ handler อะไรบ้าง
    ดังนั้น user จะสามารถสร้าง render อะไรก็ได้ โดยที่ไม่ต้องใช้ Higher Order Component 
    และจะสามารถลดความซับซ้อนของการใช้ Higher Order Component
      เช่น displayName, static properties เป็นต้น
  */

  render() {
    return this.props.render({
      on: this.state.on,
      toggle: this.toggle,
    });
  }
}


Toggle.defaultProps = {
  onToggle: () => null,
  render: () => null,
};

export default Toggle;
