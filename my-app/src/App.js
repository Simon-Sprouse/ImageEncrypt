import './App.css';
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';
import Decrypt from './Decrypt';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Encrypt</h1>
        <TextEditor />
        <ImageUploader />
        <Decrypt />
      </header>
    </div>
  );
}

export default App;
