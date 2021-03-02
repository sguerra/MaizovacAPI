import axios from 'axios';
import { RandomStringOperation } from '../../api/schema/types/operation';

const RandomService = {
    async randomString({
        length,
        digits,
        lowerAlphabetic,
        upperAlphabetic,
        unique
    }: RandomStringOperation): Promise<string> {
        const externalServiceURL = `https://www.random.org/strings/?num=1&len=${
            length || 10
        }&digits=${digits ? 'on' : 'off'}&upperalpha=${
            upperAlphabetic ? 'on' : 'off'
        }&loweralpha=${lowerAlphabetic ? 'on' : 'off'}&unique=${
            unique ? 'on' : 'off'
        }&format=plain&rnd=new`;

        const externalServiceResponse = await axios.get<string>(
            externalServiceURL
        );

        const randomString = externalServiceResponse.data.replace('\n', '');

        return randomString;
    }
};

export default RandomService;
