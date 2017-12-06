// Improve Unit Testability of Higher Order Components
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyButtonToggle from './MyButtonToggle';

configure({ adapter: new Adapter() });

/* 
  แบบนี้จะไม่ work เพราะว่า MyButtonToggle เป็น Higher Order Component
  ดังนั้น Component ที่เราได้จากการ render ของ shallow() จะเป็น Wrapper (1)

  เราสามารถแก้ปัญหาได้โดย
  วิธีที่ 1
    เอา MyButton แบบที่ยังไม่ได้ withToggle() มาใช้
    แต่! เราจำเป็นต้อง export MyButton ออกมาด้วย
  
 วิธีที่ 2
    เพิ่ม Wrapper.WrappedComponent = Component ใน Higher Order Component (2)
    และเลือกใช้เมื่อต้องการ render ใน test หรือ storybook ตามนี้
      eg. <MyButtonToggle.WrappedComponent ... />
    ซึ่งจะเป็นการ render Component ตรงๆ แทน Wrapper

  eg. from Toggle.js
    ...
    export function withToggle(Component) {
(1)->   const Wrapper = ({ innerRef, ...props }, context) => {
        const toggleContext = context[TOGGLE_CONTEXT];
        return (
          <Component
            ref={innerRef}
            toggleProps={toggleContext}
            {...props}
          />
        );
      };
      Wrapper.contextTypes = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired
      };
      Wrapper.displayName = `withToggle(${Component.displayName | Component.name})`;
(2)-> Wrapper.WrappedComponent = Component;
      return Wrapper;
    }
    ...

*/
// test('Contents should be correct', () => {
//   const wrapper = shallow(
//     <MyButtonToggle
//       toggleProps={{ on: true }}
//     />,
//   );
//   expect(wrapper.text()).toBe('on');
// });

test('Contents should be correct', () => {
  const wrapper = shallow(
    <MyButtonToggle.WrappedComponent
      toggleProps={{ on: true }}
    />,
  );
  expect(wrapper.text()).toBe('on');
});

test('toggle should be called', () => {
  const toggle = () => (toggle.called = true);
  const wrapper = shallow(
    <MyButtonToggle.WrappedComponent
      toggleProps={{ on: true, toggle }}
    />,
  );
  wrapper.find('button').simulate('click');
  expect(toggle.called).toBe(true);
});
