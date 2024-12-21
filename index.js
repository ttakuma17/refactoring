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


function volumeCreditsFor(perf) {
  let volumeCredits = 0;
  // ボリューム特典のポイントを加算
  volumeCredits += Math.max(perf.audience - 30, 0);
  // 喜劇のときに10人につき、さらにポイントを加算
  if ("comedy" === playFor(perf).type) {
    volumeCredits += Math.floor(perf.audience / 5);
  }
  return volumeCredits;
}

function statement(invoice) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
    // 注文の内訳を出力
    result += ` ${playFor(perf).name}: ${format(
      amountFor(perf, playFor(perf)) / 100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf, playFor(perf));
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result;
}