const YourComponent = () => {
  const authorName = 'Dhanush Ram (Forbes)';

  return (
    <div>
      <footer
        style={{
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderTop: '1px solid #ccc',
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        &copy; {new Date().getFullYear()} {authorName}. All rights reserved.
      </footer>
    </div>
  )
}; 

export default YourComponent;