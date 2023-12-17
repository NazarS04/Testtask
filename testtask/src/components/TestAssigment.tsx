import React, {memo} from 'react';
import Button from "./ui_elements/Button";

const TestAssigment:React.FC = memo(() => {
 return <section className="test-assignment">
   <div className="test-assignment__container container">
     <div className="test-assignment__wrapper">
       <h1 className="test-assignment__title title">Test assignment for front-end developer</h1>
       <p className="test-assignment__text">What defines a good front-end developer is one that has skilled knowledge
         of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces
         with accessibility in mind. They should also be excited to learn, as the world of Front-End Development
         keeps evolving.</p>
       <Button isButton={false} options={{href: "#signUp"}}>Sign up</Button>
     </div>
   </div>
 </section>;
});

export default TestAssigment;