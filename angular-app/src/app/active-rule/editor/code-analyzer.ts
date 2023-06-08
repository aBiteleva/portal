import {Injectable} from "@angular/core";
import {ActiveRule} from "../active-rule";

@Injectable({providedIn: 'root'})
export class CodeAnalyzer {

    analyseRule(ruleQuery: string, isEditMode: boolean): AnalyzerResponse {
        let requiredFields = [RuleKeywords.DESCRIPTION, RuleKeywords.CONDITION, RuleKeywords.ACTION];
        let activeRule = new ActiveRule();
        const queryRows = ruleQuery.split('\n');
        const ruleInitLexems = queryRows[0].trim().split(' ').filter(lex => lex !== '');
        if (ruleInitLexems[0] !== RuleKeywords.RULE) {
            return {
                errorMessage: `Ошибка: объявление правила должно начинаться с ключевого слова "${RuleKeywords.RULE}"`,
                record: null
            }
        }
        if (isEditMode) {
            activeRule.code = ruleInitLexems[1];
        }
        for (let i = 0; i < queryRows.length; i++) {
            const rowLexems = queryRows[i].trim().split(' ').filter(lex => lex !== '');
            for (let field of requiredFields) {
                if (rowLexems.includes(field)) {
                    if (rowLexems[0] !== field) {
                        return {
                            errorMessage: `Ошибка в строке ${i+1}: строка должна начинаться с ключевого слова "${field}"`,
                            record: null
                        }
                    }
                    if (rowLexems[1] !== '=') {
                        return {
                            errorMessage: `Ошибка в строке ${i+1}: пропущен или неверно указан знак присваивания "=" после ключевого слова "${field}"`,
                            record: null
                        }
                    }
                    if (rowLexems.length > 3) {
                        return {
                            errorMessage: `Ошибка в строке ${i+1}: неверно указано значение поля "${field}"`,
                            record: null
                        }
                    }
                    activeRule = this.setActiveRuleFieldValue(activeRule, field, rowLexems[2]);
                    requiredFields = requiredFields.filter(requiredField => requiredField !== field);
                }
            }
        }

        if (requiredFields.length) {
            return {
                errorMessage: `Не определены следующие обязательные параметры правила: ${requiredFields.join(', ')}`,
                record: null
            }
        } else {
            return {
                errorMessage: '',
                record: activeRule
            }
        }
    }

    private setActiveRuleFieldValue(activeRule: ActiveRule, field: RuleKeywords, value: string) {
        switch (field) {
            case RuleKeywords.ACTION:
                activeRule.action = value.replace(/"/g,"");
                return activeRule;
            case RuleKeywords.CONDITION:
                activeRule.condition = value.replace(/"/g,"");
                return activeRule;
            case RuleKeywords.DESCRIPTION:
                activeRule.description = value.replace(/"/g,"");
                return activeRule;
            default:
                return activeRule;
        }
    }
}

export enum RuleKeywords {
    RULE = 'RULE',
    TYPE = 'TYPE',
    CODE = 'CODE',
    DESCRIPTION = 'DESCRIPTION',
    EVENT = 'EVENT',
    CONDITION = 'CONDITION',
    ACTION = 'ACTION'
}

export interface AnalyzerResponse {
    errorMessage: string;
    record: ActiveRule | null;
}
