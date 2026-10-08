import useResultStore from '@/stores/useResultStore'
import ResultItem from '@/components/result/ResultItem'

const ResultList = () => {
  const resultList = useResultStore(state => state.resultList)

  return (
    <div className="flex flex-col gap-5">
      {resultList.map(({ id }, index) => (
        <ResultItem
          key={id}
          id={id}
          index={index}
        />
      ))}
    </div>
  )
}

export default ResultList
