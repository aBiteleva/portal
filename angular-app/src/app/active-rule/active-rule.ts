export interface ActiveRule {
    code: string;
    description: string;
    condition: string;
    action: string;
}

export interface ActiveRuleCreateItem {
    description: string;
    condition: string;
    action: string;
}

export interface ActiveRuleUpdateItem extends ActiveRule {}
