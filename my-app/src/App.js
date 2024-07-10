import './App.css';
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Bungus</p>
        <TextEditor />
        <ImageUploader />
      </header>
    </div>
  );
}

export default App;
