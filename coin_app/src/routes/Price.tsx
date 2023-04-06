import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinTickers } from '..//api';
import styled from 'styled-components';

const PriceUl = styled.ul``;

const PriceLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  span {
    color: ${(props) => props.theme.accentColor};
    font-weight: bold;
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceParams {
  coinId: string;
}

const Price = () => {
  const { coinId } = useParams<PriceParams>() as PriceParams;
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId)
  );

  return (
    <div>
      {tickersLoading ? (
        'Loading...'
      ) : (
        <PriceUl>
          <PriceLi>
            percent_change_1h:
            <span>{tickersData?.quotes.USD.percent_change_1h}</span>
          </PriceLi>
          <PriceLi>
            percent_change_6h:
            <span>{tickersData?.quotes.USD.percent_change_6h}</span>
          </PriceLi>
          <PriceLi>
            percent_change_12h :
            <span>{tickersData?.quotes.USD.percent_change_12h}</span>
          </PriceLi>
          <PriceLi>
            percent_change_24h :
            <span>{tickersData?.quotes.USD.percent_change_24h}</span>
          </PriceLi>
          <PriceLi>
            percent_change_7d :
            <span>{tickersData?.quotes.USD.percent_change_7d}</span>
          </PriceLi>
        </PriceUl>
      )}
    </div>
  );
};

export default Price;