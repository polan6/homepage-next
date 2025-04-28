"use client";
import React, { useState } from 'react'
import './Depression.css'
import {depSheet,ansList} from './DepSheet'

const Depression = () => {
	const [curSheet,setCurSheet]=useState(ansList)
	const [errmsg,setErrmsg]=useState('')
	const [result,setResult]=useState('')
	
	const onChecked=(i_q,i_a)=>{
		
		let new_ans=[...curSheet]
		new_ans[i_q]=i_a
		// console.log(new_ans)
		setCurSheet(new_ans)
	}
	
	const showResult=()=>{
		const score=depSheet.calcScore(curSheet)
		// console.log(score)
		if(score===-1){
			setErrmsg('未入力の項目があります')

			// curSheet 配列から -1 のインデックスを取得
			const jump = curSheet.indexOf(-1);

			// 対象の要素を取得
			const target = document.getElementById(`question_${jump}`);

			// 対象の位置を取得（70px のオフセットを引く）
			const position = target.getBoundingClientRect().top + window.scrollY - 70;

			// スムーズスクロールを実行
			window.scrollTo({
				top: position,
				behavior: 'smooth'
			});

			// スクロールが完了する前にページが遷移するのを防ぐ
			return false;

		}else{
			setErrmsg('')
			if(score<=5){
				setResult(<>
					<h2>結果</h2>
					<h3>{score}点 : 正常</h3>
					心身の不調を感じた時は、医療機関に相談してください。
				</>)
			}else if(score<=10){
				setResult(<>
					<h2>結果</h2>
					<h3>{score}点 : 軽度</h3>
					うつ病の可能性がありますので、医療機関などに相談することをおすすめします。
				</>)
			}else if(score<=15){
				setResult(<>
					<h2>結果</h2>
					<h3>{score}点 : 中等度</h3>
					うつ病の可能性がありますので、医療機関などに相談することをおすすめします。
				</>)
			}else if(score<=20){
				setResult(<>
					<h2>結果</h2>
					<h3>{score}点 : 重度</h3>
					うつ病の可能性がありますので、医療機関などに相談することをおすすめします。
				</>)
			}else if(score<=27){
				setResult(<>
					<h2>結果</h2>
					<h3>{score}点 : 極めて重度</h3>
					うつ病の可能性がありますので、医療機関などに相談することをおすすめします。
				</>)
			}
		}
	}
	return (
		<div className='depression__content'>
			<h1>うつ病チェック</h1>
			<span>うつ病チェックを簡易抑うつ症状尺度（QIDS-J）を使って行いましょう。</span>
			<h2>簡易抑うつ症状尺度（QIDS-J）とは</h2>
			<span>簡易抑うつ症状尺度（Quick Inventory of Depressive Symptomatology：QIDS-J）は、16項目の自己記入式の評価尺度で、うつ病の重症度を評価できるほか、アメリカ精神医学会の診断基準 DSM-IV の大うつ病性障害（中核的なうつ病）の診断基準に対応しているという特長を持っています。世界的に知られた精神科医 John Rush 先生によって開発され、世界 10カ国以上で使用されています。日本語版は、慶応大学医学部の藤澤大介先生のグループによって作成されました。</span>
			<h2>採点方法</h2>
			<span>睡眠に関する項目（第１－４項目）、食欲／体重に関する項目（第６－９項目）、精神運動状態に関する２項目（第１５、１６項目）は、それぞれの項目で最も点数が高いものを１つだけ選んで点数化します。それ以外の項目（第５、１０，１１，１２，１３，１４項目）は、それぞれの点数を書き出します。うつ病の重症度は、睡眠、食欲／体重、精神運動、その他6項目を合わせて9項目の合計点数（０点から２７点）で評価します。原版QIDSでは、点数と重症度は下記のようになっています。</span>
			<table className='depression__table'>
				<thead>
					<tr>
						<th scope='col'>点数</th>
						<th scope='col'>0-5</th>
						<th scope='col'>6-10</th>
						<th scope='col'>11-15</th>
						<th scope='col'>16-20</th>
						<th scope='col'>21-27</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope='row'>重症度</th>
						<td>正常</td>
						<td>軽度</td>
						<td>中等度</td>
						<td>重度</td>
						<td>極めて重度</td>
					</tr>
				</tbody>
			</table>
			<span>各項目が大うつ病性障害の症状に対応しているので、うつ症状の評価やスクリーニングに使えるほか、合計点を算出することでうつ状態の変化を見ることができます。6点以上の場合にはうつ病の可能性がありますので、まず医療機関に相談してください。</span>
			<h2>質問</h2>
			<div className='depression__question-container'>
				{depSheet.sheet.map((question,i_q)=>{
					return (
						<div key={`question_${i_q}`} className='depression__question'>
							<h3 id={`question_${i_q}`}>{question.q}</h3>
							<div className='depression__errmsg'>{errmsg&&curSheet[i_q]===-1&&"未入力です"}</div>
							<div className='depression__answer'>
			
								{question.a.map((answer,i_a)=>
									<div key={`question_${i_q}_answer_${i_a}`}>
										<label>
											<input
												type="radio"
												checked={curSheet[i_q] === i_a}
												onChange={()=>onChecked(i_q,i_a)}
											/>
											{`${i_a}. ${answer}`}
										</label>
									</div>
								)}

							</div>
						</div>
					)
				})}
			</div>
			<button onClick={showResult}>点数を計算する</button>
			
			<div className='depression__errmsg'>{errmsg}</div>
			<div className='depression__result'>{result}</div>
			<div className='depression__footer'>
				出典
				<div>
					<a href='https://www.mhlw.go.jp/bunya/shougaihoken/kokoro/dl/02.pdf'>
					https://www.mhlw.go.jp/bunya/shougaihoken/kokoro/dl/02.pdf
					</a>
				</div>
			</div>
		</div>
	)
}

export default Depression