import fs from "node:fs";
import ts from "typescript";
import { localizeText } from "../app/i18n.ts";

const files=["app/page.tsx"];
const findings=[];
const intentionalBilingual=new Set([
  "WELCOME · 欢迎",
  "默认选择英文；你之后可以随时通过顶部按钮切换语言。",
  "中","中文","使用中文继续",
  "Your preference is saved on this device. / 语言偏好只保存在当前设备。",
]);
const localeConditionalChinese=new Set(["切换到英文","英","英文","字","组","张"]);
for(const file of files){
  const source=fs.readFileSync(file,"utf8"),sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const visit=node=>{
    let value;
    if(ts.isStringLiteralLike(node)||ts.isJsxText(node)||ts.isTemplateHead(node)||ts.isTemplateMiddle(node)||ts.isTemplateTail(node))value=node.text;
    if(value?.trim()){
      const en=localizeText(value,"en"),zh=localizeText(value,"zh");
      const line=sf.getLineAndCharacterOfPosition(node.getStart(sf)).line+1;
      if(/[\u3400-\u9fff]/.test(en)&&!intentionalBilingual.has(value.trim())&&!localeConditionalChinese.has(value.trim()))findings.push({locale:"en",file,line,source:value.trim(),result:en.trim()});
      const disallowedEnglish=zh.match(/\b(?:AI|Call|Put|Bid|Ask|Greeks|Complete|Beginner|Intermediate|Advanced|contract|training|Trade|Risk|Stop|Target|Limit|Buy|Sell|Day|Volume|Open|Close|Current|Model|Real|Teaching|Track|Route|Review|Scenario|Learning|Options|Historical|Performance)\b/gi);
      if(disallowedEnglish&&/[\u3400-\u9fff]/.test(value)&&!intentionalBilingual.has(value.trim()))findings.push({locale:"zh",file,line,source:value.trim(),result:zh.trim()});
    }
    ts.forEachChild(node,visit);
  };
  visit(sf);
}
const runtimeSamples=[
  "未实现 +$0 · 已实现 +$0",
  "纯新手路线",
  "AI 交易教练",
  "10:13 · 证据 1 条",
  "查看 15 分钟周期",
  "标记水平关键位",
  "检查 754/756 看涨价差：最大风险 $23（0.1%）",
  "提交754/756 看涨价差限价单 $0.23，冻结购买力 $23，止损 35% / 止盈 60% / 15:00 退出",
  "754/756 看涨价差组合成交 $0.22",
  "自动止损：754/756 看涨价差，组合成交 $0.09，盈亏 $-14",
  "训练日结束：撤销 1 张未成交订单；按 16:00 教学估值完成清算。",
  "2026-07-15 的 SPY K线来自 Robinhood 真实分钟成交；期权 Bid/Ask、Greeks、Volume/OI 仍为教学模型。",
  "K线、期权价格与 Greeks 均为教学估值；Volume/OI 为模拟流动性指标。",
];
for(const source of runtimeSamples){
  const result=localizeText(source,"en");
  if(/[\u3400-\u9fff]/.test(result))findings.push({locale:"en",file:"runtime sample",line:0,source,result});
}
const unique=[...new Map(findings.map(x=>[`${x.locale}|${x.result}`,x])).values()];
for(const item of unique)console.log(`${item.locale.toUpperCase()} ${item.file}:${item.line}\n  ${item.source}\n  => ${item.result}`);
console.log(`\n${unique.length} localization issue(s)`);
process.exitCode=unique.length?1:0;
