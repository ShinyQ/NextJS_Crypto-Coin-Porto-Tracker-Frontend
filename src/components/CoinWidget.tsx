export default function CryptoWidget() {
  return (
    <>
    <script type="text/javascript" src="https://files.coinmarketcap.com/static/widget/coinMarquee.js" async></script>
    <div 
      id="coinmarketcap-widget-marquee" 
      data-coins="1,1027,825" 
      data-currency="USD" 
      data-theme="light" 
      data-transparent="false" 
      show-symbol-logo="true">
    </div>
    </>
  );
};

