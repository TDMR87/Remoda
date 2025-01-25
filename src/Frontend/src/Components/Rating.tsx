interface RatingProps {
  starsCount: number;
}

const Rating = ({ starsCount }: RatingProps) => {
  return (
    <div className="text-lg text-yellow-500 mt-2">
      {'★'.repeat(starsCount)}
      {'☆'.repeat(10 - starsCount)}
      <span className="ml-2 text-sm">({starsCount}/10)</span>
    </div>
  )
}

export default Rating