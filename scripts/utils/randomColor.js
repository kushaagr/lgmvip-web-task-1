export default function getRandomColor() {
  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF', '#FF33FF']; // Add your palette colors here
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
