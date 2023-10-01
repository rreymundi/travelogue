import { useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import qs from "qs"

export const useQueryState = (query) => {
  const location = useLocation()
  const navigate = useNavigate()

  const setQuery = useCallback(
    value => {
      const existingQueries = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      })

      const queryString = qs.stringify(
        { ...existingQueries, [query]: value },
        { skipNulls: true }
      )

      navigate(`${location.pathname}?${queryString}`)
    },
    [navigate, location, query]
  )

  return [
    qs.parse(location.search, { ignoreQueryPrefix: true })[query],
    setQuery,
  ]

}