import './App.css';
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Encrypt</h1>
        <TextEditor />
        <ImageUploader />
      </header>
    </div>
  );
}

export default App;
