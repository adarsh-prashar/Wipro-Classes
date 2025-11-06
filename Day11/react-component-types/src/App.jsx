import React, { useState, useRef, Component, PureComponent } from 'react';
import './App.css'

// 1) Functional Component (with Hooks)
function FunctionalComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>1. Functional Component (with Hooks)</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// 2) Class Component
class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <h3>2. Class Component</h3>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
      </div>
    );
  }
}

// 3) Pure Component
class PureComponentExample extends PureComponent {
  render() {
    return (
      <div>
        <h3>3. Pure Component</h3>
        <p>This component only re-renders if props change.</p>
      </div>
    );
  }
}

// 4) Higher-Order Component (HOC)
function withLogging(WrappedComponent) {
  return function(props) {
    console.log('Rendering:', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}

const FunctionalWithLogging = withLogging(FunctionalComponent);

// 5) Controlled Component (form input)
function ControlledComponent() {
  const [value, setValue] = useState('');

  return (
    <div>
      <h3>5. Controlled Component</h3>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <p>Value: {value}</p>
    </div>
  );
}

// 6) Uncontrolled Component (ref-based input)
function UncontrolledComponent() {
  const inputRef = useRef();

  const handleSubmit = () => {
    alert('Value: ' + inputRef.current.value);
  };

  return (
    <div>
      <h3>6. Uncontrolled Component</h3>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// 7) Error Boundary (class only)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong.</h3>;
    }

    return this.props.children;
  }
}

// Component that throws error for demo
function ComponentThatThrows() {
  throw new Error('Demo error');
}

function App() {
  return (
    <div className="App">
      <h1>React Components Demo — Types</h1>
      <FunctionalComponent />
      <ClassComponent />
      <PureComponentExample />
      <FunctionalWithLogging />
      <ControlledComponent />
      <UncontrolledComponent />
      <ErrorBoundary>
        <div>
          <h3>7. Error Boundary</h3>
          <p>This is wrapped in Error Boundary. Uncomment the line below to see error handling.</p>
          {/* <ComponentThatThrows /> */}
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
