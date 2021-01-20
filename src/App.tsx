import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import './styles/index.scss';

function App() {
  return (
    <div className="App">
       <h1>Button compoennt</h1>
       <Button autoFocus onClick={()=> alert(123)}>Button</Button>
       <Button className="custom" disabled>Disabled Button</Button>
       <Button btnSize={ButtonSize.small}>Small Button</Button>
       <Button btnSize={ButtonSize.large}>Large Button</Button>
       <Button btnType={ButtonType.success}>Success Button</Button>
       <Button btnType={ButtonType.default}>Default Button</Button>
       <Button btnType={ButtonType.danger}>Danger Button</Button>
       <Button btnType={ButtonType.link} href="http://www.baidu.com" target="_blank">Baidu Link</Button>
       <Button btnType={ButtonType.link} href="#" disabled>Disabled Link</Button>
       <hr />

       <h1>Alert compoennt</h1>
       <Alert 
          closable={true}
          alertType={AlertType.success}
       >
          success alert!
      </Alert>
      <br/>
      <Alert 
          closable={true}
          alertType={AlertType.warning}
       >
          warning alert
      </Alert>
      <br/>
      <Alert 
        closable={true}
        alertType={AlertType.danger}
      >
          this is an important description
      </Alert>
      <br/>
      <Alert 
          title="wo shi title"
          closable={true}
          alertType={AlertType.default}
       >
          with title default alert
      </Alert>
      <br/>
      <Alert 
          title="wo shi title"
          closable={false}
          alertType={AlertType.default}
       >
          with title default alert no close
      </Alert>
      <br/>
    </div>
  );
}

export default App;
