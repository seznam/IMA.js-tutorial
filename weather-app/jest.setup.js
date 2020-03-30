const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { setConfig } = require('@ima/plugin-testing-integration');
const EnzymePageRenderer = require('@ima/plugin-testing-integration/EnzymePageRenderer');

enzyme.configure({ adapter: new Adapter() });

setConfig({
    TestPageRenderer: EnzymePageRenderer
});
