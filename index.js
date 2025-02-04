



function statement(invoice) {
  function amountFor(aPerformance) {
    let result = 0;
    // このSwitch文がまず分割できそう
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`)
    }
    return result;
  }
  
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  
  
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    // ボリューム特典のポイントを加算
    result += Math.max(aPerformance.audience - 30, 0);
    // 喜劇のときに10人につき、さらにポイントを加算
    if ("comedy" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }
  
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD", minimumFractionDigits: 2
    }).format(aNumber / 100);
  }
  
  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
      // 注文の内訳を出力
      result += ` ${playFor(perf).name}: ${usd(
        amountFor(perf, playFor(perf)))} (${perf.audience} seats)\n`;
      totalAmount += amountFor(perf, playFor(perf));
    }
  }

  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;

  result += `Amount owed is ${usd(totalAmount)}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`
  return result;
} 