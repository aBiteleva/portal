import {Injectable} from "@angular/core";
import {Event} from '../event';
import {ActiveRule} from "../../active-rule/active-rule";

@Injectable({providedIn: 'root'})
export class EventCodeAnalyzer {

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
                        const valueLexem = rowLexems.slice(2).join(' ');
                        rowLexems.splice(2, rowLexems.length - 2, valueLexem);
                        if (!valueLexem.endsWith('"') || !valueLexem.startsWith('"')
                            || valueLexem.split('"').length !== 3) {
                            return {
                                errorMessage: `Ошибка в строке ${i+1}: неверно указано значение поля "${field}"`,
                                record: null
                            }
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

    manageEventValueForEditor(selectedEvents: Event[] | undefined, query: string): string {
        const queryRows = query.split('\n');
        if (query.includes(RuleKeywords.EVENT)) {
            for (let i = 0; i < queryRows.length; i++) {
                const rowLexems = queryRows[i].trim().split(' ').filter(lex => lex !== '');
                if (rowLexems.includes(RuleKeywords.EVENT)) {
                    queryRows.splice(i, 1);
                }
            }
        }
        if (selectedEvents?.length) {
            queryRows.push(`EVENT = "${selectedEvents.map(ev => ev.code).join(', ')}"`)
        }
        return queryRows.join('\n');
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

export enum ChangeEventMode {
    DROPDOWN = 'dropdown',
    EDITOR = 'editor'
}

export interface AnalyzerResponse {
    errorMessage: string;
    record: ActiveRule | null;
}
